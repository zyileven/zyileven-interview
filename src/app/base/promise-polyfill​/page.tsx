import CodeSyntax from '@/components/CodeSyntax';
import { getFileContentByPath } from '@/lib/server-utils';

async function PromisePolyfillPage() {

  const content = getFileContentByPath("src/lib/js-lib/PromisePolyfill.js")

  return (
    <div>
      <CodeSyntax code={content} />
    </div>
  );
}

export default PromisePolyfillPage;