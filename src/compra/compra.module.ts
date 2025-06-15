import { CompraModule } from './compra/compra.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(/* config */),
    CompraModule,
    // otros módulos...
  ],
})
export class AppModule {}
