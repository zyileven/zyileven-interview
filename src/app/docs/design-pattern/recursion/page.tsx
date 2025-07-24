import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CreateObjectPage() {

  const content = getFileContentByPath("src/md/pattern/递归.md")

  return (
    <div className=''>
      <MdWrapper content={content} />
    </div>
  );
}

export default CreateObjectPage;