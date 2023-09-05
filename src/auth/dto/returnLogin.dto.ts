import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export class ReturnLogin {
  accessToken: string;
  user: ReturnUserDto;
}
