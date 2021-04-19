import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { SalesModule } from '@modules/sales.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@environments/environment';
@Module({
  imports: [MongooseModule.forRoot(environment.DB_CLIENT_URI), SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
