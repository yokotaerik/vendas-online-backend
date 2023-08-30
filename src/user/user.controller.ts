import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async GetAllUsers() {
    return JSON.stringify({ test: 'abc' });
  }
}
