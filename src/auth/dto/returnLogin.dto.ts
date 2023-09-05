import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export class ReturnLogin {
  accessToken: string;
  user: ReturnUserDto;
}
