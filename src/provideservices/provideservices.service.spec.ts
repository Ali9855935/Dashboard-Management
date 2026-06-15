import { Test, TestingModule } from '@nestjs/testing';
import { ProvideservicesService } from './provideservices.service';

describe('ProvideservicesService', () => {
  let service: ProvideservicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvideservicesService],
    }).compile();

    service = module.get<ProvideservicesService>(ProvideservicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
