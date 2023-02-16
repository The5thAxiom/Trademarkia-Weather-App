interface OutboundLinkProps {
    href: string;
}

export default function OutboundLink({
    href,
    children
}: React.PropsWithChildren<OutboundLinkProps>) {
    return (
        <a target='_blank' rel='noreferrer' href={href}>
            {children}
        </a>
    );
}
