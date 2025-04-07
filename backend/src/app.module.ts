import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeService } from './recipee/recipee.service';
import { RecipeController } from './recipee/recipee.controller';

@Module({
  imports: [],
  controllers: [AppController, RecipeController],
  providers: [AppService, RecipeService],
})
export class AppModule {}
