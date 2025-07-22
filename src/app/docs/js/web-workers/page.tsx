import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function WebWorkersPage() {

  const content = getFileContentByPath("src/md/Web-Workers.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default WebWorkersPage;