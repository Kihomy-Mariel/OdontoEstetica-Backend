import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from 'usuario/entities/usuario.entity';

import { Persona } from 'persona/entities/persona.entity';
import { Rol } from 'rol/entities/rol.entity';
import { RolPrivilegio } from 'rol-privilegio/entities/rol-privilegio.entity';
import { Privilegio } from 'privilegio/entities/privilegio.entity';
import { Empleado } from 'empleado/entities/empleado.entity';
import { Paciente } from 'paciente/entities/paciente.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'consultorio_dental',

  // 👇 Cuidado: usa .ts cuando corras con ts-node, .js cuando ya compiles
  entities: [__dirname + '/../**/*.entity.{ts,js}'],

  synchronize: false,
});


async function main() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(Usuario);
  const usuarios = await userRepo.find();


  const nuevaClave = await bcrypt.hash('clave123', 10);

  for (const user of usuarios) {
    user.password = nuevaClave;
    await userRepo.save(user);
    console.log(`✅ Usuario "${user.username}" actualizado`);
  }

  await AppDataSource.destroy();
  console.log('✅ Seed finalizado.');
}

main().catch((err) => console.error('❌ Error al ejecutar el seed:', err));