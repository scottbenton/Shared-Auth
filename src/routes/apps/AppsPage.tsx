import {
  Box,
  Grid,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";

interface AppConfig {
  name: string;
  url: string;
  about?: string;
  logoUrl: string;
  tags?: string[];
}

const internalApps: AppConfig[] = [];

const externalApps: AppConfig[] = [
  {
    name: "Sentinel",
    url: "https://sentinel.scottbenton.dev",
    logoUrl: "https://sentinel.scottbenton.dev/favicon.svg",
    tags: ["Beta"],
    about:
      "A tool to help activists and community members keep up with local government.",
  },
  {
    name: "Iron Link",
    url: "https://iron-link.com",
    about:
      "The follow up to Iron Fellowship and Crew Link, Iron Link allows people to play the table top roll playing games Ironsworn and Starforged online with friends.",
    logoUrl: "https://iron-link.com/favicon.svg",
    tags: ["Beta"],
  },
  {
    name: "Iron Fellowship",
    url: "https://iron-fellowship.scottbenton.dev",
    about:
      "An online tool to help people play the Ironsworn tabletop role playing game.",
    logoUrl: "https://iron-fellowship.scottbenton.dev/theme/sunset.svg",
  },
  {
    name: "Crew Link",
    url: "https://starforged-crew-link.scottbenton.dev",
    about:
      "An online tool to help people play the Starforged tabletop role playing game.",
    logoUrl: "https://starforged-crew-link.scottbenton.dev/theme/eidolon.svg",
  },
  {
    name: "Pomodoro",
    url: "https://pomodoro.scottbenton.dev",
    logoUrl: "https://pomodoro.scottbenton.dev/favicon.ico",
    about:
      "A simple productivity timer based on the Pomodoro Technique, with plenty of personalization options.",
  },
];

export default function AppsPage() {
  return (
    <Box mt={4} display="flex" flexDirection={"column"} gap={6}>
      <AppsSection name="Apps that use your account" apps={internalApps} />
      <AppsSection name="My other projects" apps={externalApps} />
    </Box>
  );
}

function AppsSection(props: { name: string; apps: AppConfig[] }) {
  const { name, apps } = props;

  return (
    <Box>
      <Heading size="md">{name}</Heading>
      <Grid
        mt={2}
        gap={4}
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
      >
        {apps.map((app) => (
          <LinkBox
            key={app.name}
            p={4}
            borderWidth="1px"
            rounded="md"
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            gap={4}
          >
            <Image src={app.logoUrl} alt={app.name} width={32} height={32} />
            <LinkOverlay href={app.url}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                gap={2}
              >
                <Heading as="h2" size="md" textAlign="center">
                  {app.name}
                </Heading>
                {app.tags?.length && (
                  <>
                    {app.tags.map((tag) => (
                      <Tag.Root key={tag} colorPalette={"blue"}>
                        <Tag.Label>{tag}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </>
                )}
              </Box>
              <Text color="fg.muted" textAlign="center">
                {app.about}
              </Text>
            </LinkOverlay>
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
}
