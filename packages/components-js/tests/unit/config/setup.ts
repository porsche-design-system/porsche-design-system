import { SpecReporter } from 'jasmine-spec-reporter';
import CustomReporter = jasmine.CustomReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter() as CustomReporter);
