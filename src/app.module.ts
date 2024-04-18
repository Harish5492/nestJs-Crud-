import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './controller/student/student.controller';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './service/student/student.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/studentdb', {
      retryAttempts: 2, // Number of connection retry attempts
      retryDelay: 1000, // Delay between each retry attempt in milliseconds (1 second in this case)
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      await MongooseModule.forRootAsync({
        useFactory: () => ({
          uri: 'mongodb://localhost:27017/studentdb',
          retryAttempts: 2,
          retryDelay: 1000,
        }),
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
