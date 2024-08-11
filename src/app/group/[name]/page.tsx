interface PageProps {
  params: {
    name: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>{params.name}</div>;
}
