import { Test, TestingModule } from '@nestjs/testing';
import { ProvideservicesController } from './provideservices.controller';
import { ProvideservicesService } from './provideservices.service';

describe('ProvideservicesController', () => {
  let controller: ProvideservicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvideservicesController],
      providers: [ProvideservicesService],
    }).compile();

    controller = module.get<ProvideservicesController>(ProvideservicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
