import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters();
//@ts-ignore till https://github.com/bcaudan/jasmine-spec-reporter/issues/588 is fixed
jasmine.getEnv().addReporter(new SpecReporter());
