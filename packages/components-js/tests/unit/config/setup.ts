import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters();
// TODO: remove @ts-ignore when https://github.com/bcaudan/jasmine-spec-reporter/issues/588 is fixed
//@ts-ignore
jasmine.getEnv().addReporter(new SpecReporter());
