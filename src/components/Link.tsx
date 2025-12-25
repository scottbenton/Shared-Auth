import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as RouterLink } from "wouter";

export interface LinkProps extends ChakraLinkProps {
  to: string;
}

export function Link(props: LinkProps) {
  const { children, to, ...chakraLinkProps } = props;

  return (
    <ChakraLink {...chakraLinkProps} asChild>
      <RouterLink to={to}>{children}</RouterLink>
    </ChakraLink>
  );
}
