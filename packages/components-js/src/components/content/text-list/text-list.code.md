# Text List

Text lists are used to display listed data in form of an unordered or ordered list. A list depends on two parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists.

## Unordered list

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list :theme="theme">
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
        <p-text-list :theme="theme">
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
            <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list :theme="theme">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

## Ordered list - numbered

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list list-type="ordered" :theme="theme">
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog
        <p-text-list list-type="ordered" :theme="theme">
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
          <p-text-list-item>The quick brown fox jumps over the lazy dog
            <p-text-list list-type="ordered" :theme="theme">
              <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
              <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            </p-text-list>
          </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

## Ordered list - alphabetically

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list list-type="ordered" order-type="alphabetically" :theme="theme">
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog
        <p-text-list list-type="ordered" order-type="alphabetically" :theme="theme">
          <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick brown fox jumps over the lazy dog
            <p-text-list list-type="ordered" order-type="alphabetically" :theme="theme">
              <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
              <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            </p-text-list>
          </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
    </p-text-list>
  </template>
</Playground>



