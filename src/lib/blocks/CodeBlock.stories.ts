import type { Meta, StoryObj } from '@storybook/svelte';
import CodeBlock from './CodeBlock.svelte';

const meta = {
  title: 'Blocks/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'select', options: ['javascript', 'typescript', 'html', 'css', 'svelte'] },
  },
} satisfies Meta<CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JavaScript: Story = {
  args: {
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'javascript',
  },
};

export const TypeScript: Story = {
  args: {
    code: `interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const john: Person = { name: 'John', age: 30 };
console.log(greet(john));`,
    language: 'typescript',
  },
};

export const HTML: Story = {
  args: {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
</head>
<body>
  <h1>Welcome to my website</h1>
  <p>This is a sample HTML page.</p>
</body>
</html>`,
    language: 'html',
  },
};

export const CSS: Story = {
  args: {
    code: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}`,
    language: 'css',
  },
};

export const Svelte: Story = {
  args: {
    code: `<script lang="ts">
  let count = $state(0);

  function increment() {
    count++;
  }
</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    font-size: 16px;
    padding: 10px 20px;
  }
</style>`,
    language: 'svelte',
  },
};