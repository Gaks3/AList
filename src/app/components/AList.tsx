import Image from 'next/image'

interface AListProps {
  title: string
  images: string
}

const AList = ({ title, images }: AListProps) => {
  return (
    <div className="bg-indigo-500">
      <Image src={images} alt={title} width={600} height={600} />
      <h3>{title}</h3>
    </div>
  )
}

export default AList
