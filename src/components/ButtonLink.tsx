import { Button, type ButtonProps } from "@chakra-ui/react";
import { Link } from "wouter";

export interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export function ButtonLink(props: ButtonLinkProps) {
  const { to, children, ...buttonProps } = props;

  return (
    <Button {...buttonProps} asChild>
      <Link to={to}>{children}</Link>
    </Button>
  );
}
