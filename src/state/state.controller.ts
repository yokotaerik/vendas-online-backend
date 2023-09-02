import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateSerice: StateService) {}

  @Get()
  async getAllStates(): Promise<StateEntity[]> {
    return this.stateSerice.getAllStates();
  }
}
