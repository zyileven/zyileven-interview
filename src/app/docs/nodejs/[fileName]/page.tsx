import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';
import { notFound } from 'next/navigation';

async function CreateObjectPage({params}) {

  const {fileName} = await params;
  let content = ""
  try {
    content = await getFileContentByPath(`/public/md/nodejs/${fileName}.md`)
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <div className='p-6'>
      <MdWrapper content={content} />
    </div>
  );
}

export default CreateObjectPage;