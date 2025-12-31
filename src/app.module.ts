import { Module, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballApiModule } from './modules/football-api/football-api.module';
import { WorldCupModule } from './modules/worldcup/worldcup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('TypeOrmConfig');

        // Railway의 DATABASE_URL 지원
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          logger.log('Using DATABASE_URL for connection');
          try {
            // postgres:// 또는 postgresql:// URL 파싱
            const url = new URL(databaseUrl);
            const config = {
              type: 'postgres' as const,
              host: url.hostname,
              port: parseInt(url.port) || 5432,
              username: url.username,
              password: url.password,
              database: url.pathname.slice(1), // '/' 제거
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: false,
              ssl: { rejectUnauthorized: false }, // Railway는 SSL 필요
            };
            logger.log(
              `Connecting to database: ${config.host}:${config.port}/${config.database}`,
            );
            return config;
          } catch (error) {
            logger.error('Failed to parse DATABASE_URL', error);
            throw error;
          }
        }

        // 개별 환경변수 사용
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT');
        const dbUser = configService.get<string>('DB_USER');
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');

        logger.log(`DB_HOST: ${dbHost || 'NOT SET'}`);
        logger.log(`DB_PORT: ${dbPort || 'NOT SET'}`);
        logger.log(`DB_USER: ${dbUser || 'NOT SET'}`);
        logger.log(`DB_NAME: ${dbName || 'NOT SET'}`);

        if (!dbHost || !dbUser || !dbPassword || !dbName) {
          logger.error('Database environment variables are not set properly!');
          throw new Error('Database configuration is missing');
        }

        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort || 5432,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl:
            configService.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
    HttpModule,
    FootballApiModule,
    WorldCupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
