interface SectionTitleProps {
  title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <h2 className="fond-bold mb-3 mt-6 uppercase text-gray-400">{title}</h2>
  )
}

export default SectionTitle
