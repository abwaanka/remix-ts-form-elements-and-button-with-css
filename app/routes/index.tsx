import { Button, ButtonLink, LinkButton, links as buttonLinks } from "~/components/button";
import { Input, Label, links as formElementsLinks } from "~/components/form-elements";


export const links = () => [
  ...buttonLinks(),
  ...formElementsLinks(),
];



export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
     
      <div className="input-demo">
        <div className="input-container">
          <div className="lbl-box">
            <Label htmlFor="email-address">Email address</Label>
          </div>

          <Input
            autoFocus
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={""}
            required
            placeholder="Email address"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Button type="submit" disabled={false}>
            Email a login link
          </Button>
          <LinkButton type="reset">
            Reset
          </LinkButton>
        </div>
      </div>

      

      <div className="cta-content">
          <ButtonLink to="#" variant="primary"  prefetch="intent">
              Register for Free            
          </ButtonLink>

          <ButtonLink to="#" variant="secondary" prefetch="intent">
              Courses
          </ButtonLink>

          <Button variant="danger">Danger Button</Button>
        </div>

    </div>
  );
}
