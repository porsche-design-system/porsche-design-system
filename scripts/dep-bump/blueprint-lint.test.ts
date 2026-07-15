import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { parse } from 'yaml';

const blueprintPath = join(process.cwd(), '.turbo-spec/workflows/dep-bump.yml');
const blueprint = parse(readFileSync(blueprintPath, 'utf8')) as {
  stages: {
    name: string;
    agents?: { type: string; model?: string; model_kwargs?: { model_id?: string } }[];
  }[];
};

const updateStage = blueprint.stages.find((s) => s.name === 'update');
const implementer = updateStage?.agents?.find((a) => a.type === 'implementer');

// F9: a lone `model_kwargs` is silently ignored by the engine unless `model`
// (the provider key) is also set on the agent, so the stage-level model_id
// override never takes effect. Guard both keys so the override is honored.
test('update implementer sets the model provider so model_kwargs is honored', () => {
  assert.ok(implementer, 'update stage must declare an implementer agent');
  assert.equal(
    implementer?.model,
    'copilot',
    'implementer must set `model: copilot` or its model_kwargs.model_id is ignored'
  );
});

test('update implementer pins an explicit model_id', () => {
  assert.equal(typeof implementer?.model_kwargs?.model_id, 'string', 'implementer must pin model_kwargs.model_id');
  assert.ok((implementer?.model_kwargs?.model_id ?? '').length > 0);
});
