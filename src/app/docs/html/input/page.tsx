import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CreateObjectPage() {

  const content = getFileContentByPath("src/md/html/input.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default CreateObjectPage;