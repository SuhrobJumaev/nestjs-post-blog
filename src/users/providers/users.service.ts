import { CreateUserDto } from './../dtos/create-user.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { first } from 'rxjs';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * The method to get all users from the database
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(this.profileConfiguration);
    const isAuth = this.authService.isAuth();

    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
      {
        firstName: 'Zach',
        email: 'zach@doe.com',
      },
    ];
  }

  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({
      id,
    });
  }
}
