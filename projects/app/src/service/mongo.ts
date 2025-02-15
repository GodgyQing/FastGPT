import { PRICE_SCALE } from '@fastgpt/global/support/wallet/constants';
import { MongoUser } from '@fastgpt/service/support/user/schema';
import { connectMongo } from '@fastgpt/service/common/mongo/init';
import { hashStr } from '@fastgpt/global/common/string/tools';
import { createDefaultTeam } from '@fastgpt/service/support/user/team/controller';
import { exit } from 'process';
import { mongoSessionRun } from '@fastgpt/service/common/mongo/sessionRun';

/**
 * This function is equivalent to the entry to the service
 * connect MongoDB and init data
 */
export function connectToDatabase() {
  return connectMongo();
}

export async function initRootUser(retry = 3): Promise<any> {
  try {
    const rootUser = await MongoUser.findOne({
      username: 'root'
    });
    const psw = process.env.DEFAULT_ROOT_PSW || '123456';

    let rootId = rootUser?._id || '';

    await mongoSessionRun(async (session) => {
      // init root user
      if (rootUser) {
        await rootUser.updateOne({
          password: hashStr(psw)
        });
      } else {
        const [{ _id }] = await MongoUser.create(
          [
            {
              username: 'root',
              password: hashStr(psw)
            }
          ],
          { session }
        );
        rootId = _id;
      }
      // init root team
      await createDefaultTeam({ userId: rootId, session });

      // const filePath = path.join(process.cwd(), 'users.txt');
      // console.log('filePath', filePath);

      // async function loadUsersFromFile() {
      //   const data = fs.readFileSync(filePath, 'utf-8');
      //   return data
      //     .split('\n')
      //     .map((line) => line.trim())
      //     .filter((line) => line) // 过滤空行
      //     .map((line) => {
      //       const [username, password] = line.split(','); // 假设用户名和密码用逗号分隔
      //       return { username, password };
      //     });
      // }
      // const users = await loadUsersFromFile();

      // await mongoSessionRun(async (session) => {
      //   for (const user of users) {
      //     const hashedPassword = hashStr(user.password);
      //     const newUser = await MongoUser.create(
      //       [
      //         {
      //           username: user.username,
      //           password: hashedPassword
      //         }
      //       ],
      //       { session }
      //     );

      //     const userId = newUser[0]._id;
      //     await createDefaultTeam({ userId, session });
      //   }
      // });
    });

    console.log(`root user init:`, {
      username: 'root',
      password: psw
    });
  } catch (error) {
    if (retry > 0) {
      console.log('retry init root user');
      return initRootUser(retry - 1);
    } else {
      console.error('init root user error', error);
      exit(1);
    }
  }
}
