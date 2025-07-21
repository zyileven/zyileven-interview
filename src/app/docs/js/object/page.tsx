import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function ObjectPage() {

  const content = getFileContentByPath("src/md/Object.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default ObjectPage;