import { NextPageWithLayout } from '../_app';

import { Main } from '@/layouts/main';
import { Authorized } from '@/layouts/authorised';

const Index: NextPageWithLayout = () => {
  return <div className='bg-background p-5 rounded-lg'>My photos</div>;
};

Index.getLayout = (page) => (
  <Main title='Authorised / Photos'>
    <Authorized>{page}</Authorized>
  </Main>
);

export default Index;
