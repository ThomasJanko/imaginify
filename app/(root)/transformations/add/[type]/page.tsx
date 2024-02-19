import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const AddTransformationPage = async ({ params: {type}} : SearchParamProps) => {
  const { userId } = auth()
  if(!userId) redirect('/sign-in')

  const transformation = transformationTypes[type];
  const user = await getUserById(userId)

  return (
    <>
    <Header 
      title={transformation.title}
      subtitle={transformation.subTitle}
    />
    <section className='mt-10'>
      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </section>
    </>
  )
}

export default AddTransformationPage

