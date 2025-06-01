import Image from 'next/image'

const CertificateItem = ({ certificate }) => {
    return (
        <div className="bg-muted mb-4 flex w-[305.5px] flex-col rounded-lg border-b p-4 last:border-b-0">
            <Image
                src="/images/certificate.png"
                alt={certificate.title}
                width={300}
                height={200}
                className="object-contain"
            />
            <h4 className="text-foreground mt-4 truncate text-sm font-semibold">
                {certificate.title}
            </h4>
            <p className="text-foreground mt-1 text-center text-sm">
                {certificate.date}
            </p>
        </div>
    )
}

export default CertificateItem
