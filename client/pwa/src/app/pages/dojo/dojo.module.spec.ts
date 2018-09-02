import { DojoModule } from './dojo.module';

describe('DojoModule', () => {
  let dojoModule: DojoModule;

  beforeEach(() => {
    dojoModule = new DojoModule();
  });

  it('should create an instance', () => {
    expect(dojoModule).toBeTruthy();
  });
});
