import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function ReactForwardRefPage() {

  const content = await getFileContentByPath("/public/md/react/forwardRef.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default ReactForwardRefPage;