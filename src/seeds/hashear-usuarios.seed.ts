import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from 'usuario/entities/usuario.entity';
import { Persona } from 'persona/entities/persona.entity';
import { Rol } from 'rol/entities/rol.entity';
import { RolPrivilegio } from 'rol-privilegio/entities/rol-privilegio.entity';
import { Privilegio } from 'privilegio/entities/privilegio.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', // tu contraseña
  database: 'consultorio_dental',
  entities: [Usuario, Persona, Rol, RolPrivilegio, Privilegio],
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