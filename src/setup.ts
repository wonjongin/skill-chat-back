import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as Spinners from 'spinnies';
import { Pool } from 'pg';

function delay(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null), t);
  });
}

async function setupDB(pool: Pool, sql: string) {
  const db = await pool.connect();
  const res = await db.query(sql);
  return res;
}

async function main() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'PGHOST',
      message: 'Input PostgreSQL host for SkillChat',
      default: 'localhost',
    },
    {
      type: 'number',
      name: 'PGPORT',
      message: 'Input PostgreSQL port for SkillChat',
      default: '5432',
    },
    {
      type: 'input',
      name: 'PGUSER',
      message: 'Input PostgreSQL user name for SkillChat',
      default: 'postgres',
    },
    {
      type: 'input',
      name: 'PGDATABASE',
      message: 'Input PostgreSQL DB name for SkillChat',
      default: 'skillchat',
    },
    {
      type: 'password',
      name: 'PGPASSWORD',
      message: 'Input PostgreSQL password for SkillChat',
    },
    {
      type: 'number',
      name: 'SERVER_PORT',
      message: 'Input Skill Chat api server port for SkillChat',
      default: '8080',
    },
  ]);
  const pool = new Pool({
    user: answer.PGUSER,
    host: answer.PGHOST,
    database: answer.PGDATABASE,
    password: answer.PGPASSWORD,
    port: +answer.PGPORT,
  });
  const spinnies = new Spinners();
  spinnies.add('checkConnection', {
    text: 'Checking Connection to PostgreSQL DB',
  });

  try {
    await setupDB(pool, 'SELECT NOW()');
    spinnies.succeed('checkConnection', {
      text: 'Success to Connect to PostgreSQL DB',
    });
  } catch (err) {
    spinnies.fail('checkConnection', {
      text: 'Fail to Connect to PostgreSQL DB. Please check the DB Info',
    });
    process.exit(1);
  }

  spinnies.add('writeDotenv', {
    text: 'Writing .env file ...',
  });
  const envText = `PGUSER=${answer.PGUSER}
PGHOST=${answer.PGHOST}
PGPASSWORD=${answer.PGPASSWORD}
PGDATABASE=${answer.PGDATABASE}
PGPORT=${answer.PGPORT}
SERVER_PORT=${answer.SERVER_PORT}`;

  const envPath = '.env';

  if (fs.existsSync(envPath)) {
    spinnies.fail('writeDotenv', {
      text: '.env file is already exist',
    });
    process.exit(1);
  } else {
    try {
      fs.writeFileSync(envPath, envText);
      spinnies.succeed('writeDotenv', {
        text: 'Success to write .env file',
      });
    } catch (err) {
      spinnies.fail('writeDotenv', {
        text: '.env file is already exist',
      });
      process.exit(1);
    }
  }

  spinnies.add('createUserDataTable', {
    text: 'Creating table for user data...',
  });
  spinnies.add('createChattingDataTable', {
    text: 'Creating table for chatting data...',
  });

  await setupDB(
    pool,
    `CREATE TABLE userdata (
    id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL UNIQUE,
    displayUserName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    chatList JSON DEFAULT '[]',
    friendList JSON DEFAULT '[]',
    photo TEXT,
    signDate TIMESTAMP NOT NULL
  );`,
  )
    .then(() => {
      spinnies.succeed('createUserDataTable', {
        text: 'Success to create table for user data',
      });
    })
    .catch((err) => {
      // console.log(err);
      spinnies.fail('createUserDataTable', {
        text: 'Fail to create table for user data',
      });
    });
  await setupDB(
    pool,
    `CREATE TABLE chattingRoomId (
    id SERIAL PRIMARY KEY,
    roomId TEXT NOT NULL UNIQUE,
    users TEXT NOT NULL DEFAULT '[]',
    displayRoomName TEXT NOT NULL,
    content JSON NOT NULL DEFAULT '[]'
  );`,
  )
    .then(() => {
      spinnies.succeed('createChattingDataTable', {
        text: 'Success to create table for chatting data',
      });
    })
    .catch((err) => {
      // console.log(err);
      spinnies.fail('createChattingDataTable', {
        text: 'Fail to create table for chatting data',
      });
    });
  process.exit(0);
}

main();
