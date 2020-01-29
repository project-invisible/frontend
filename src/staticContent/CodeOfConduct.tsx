import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textFrame: {
    margin: "18px"
  },
  headline: {
    padding: "16px",
    textDecoration: "bold"
  },
  bodyText: {
    padding: "16px"
  }
}));

function CodeOfConduct() {
  const classes = useStyles({});

  return (
    <Paper className={classes.textFrame}>
      <Typography variant="h4" className={classes.headline}>
        Code of conduct
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        The IN_VISIBLE project has itself set the goal of creating a
        discrimination-free space for all people. We do not tolerate harassment
        or discrimination of guests or members in any way.
        <br />
        This Code of Conduct applies to all meetings and events, i.e. to the
        physical club rooms but also to online presences such as mailing lists,
        forums, chat, wiki, etc. Violations of this Code of Conduct may result
        in the board of directors restricting rights or excluding the person
        concerned from individual areas of the association or from the
        association altogether.
        <br />
        It is the responsibility of those who move in these "rooms" to inform
        themselves about additional rules and to follow them.
        <br />
        We consider harassment to be, among other things:
        <ul>
          <li>
            Hurtful remarks regarding gender, gender identity, sexual
            orientation, disabilities, mental illness, neuro(a)typicality,
            external appearance, physique, age, skin colour, ethnicity or
            religion.
          </li>
          <li>
            Unwanted remarks regarding a person's lifestyle, e.g. regarding
            nutrition, health, child rearing, drugs or employment.
          </li>
          <li>
            Intentional misgendering or the use of "dead" or discarded names.
          </li>
          <li>
            Unnecessary or off-topic pornographic images or sexual behavior in
            areas where it is not appropriate.
          </li>
          <li>
            Physical touching or simulated touching (e.g. written descriptions
            such as "hug") without consent or after request to refrain from
            doing so.
          </li>
          <li>Threat of violence.</li>
          <li>
            Inciting violence against a person, including encouraging a person
            to commit suicide or self-injury.
          </li>
          <li>Deliberate intimidation.</li>
          <li>Stalking or persecution.</li>
          <li>
            Harassing photographing or recording, including logging online
            activities for the purpose of harassment.
          </li>
          <li>Unwanted sexual attention.</li>
          <li>
            Ongoing inappropriate social contact, e.g. asking/presupposing an
            inappropriate level of familiarity with others.
          </li>
          <li>
            Continued direct communication after being asked not to do so.
          </li>
          <li>
            The deliberate "outing" of part of a person's identity without their
            consent, unless this is necessary to protect a vulnerable person
            from intentional misuse.
          </li>
        </ul>
        <Typography variant="body1" className={classes.bodyText}>
          The publication of non-harassing private correspondence. To the
          IN_VISIBLE space, the security of marginalized persons is more
          important than the comfort of privileged persons. The board reserves
          the right not to respond to:
        </Typography>
        <ul>
          <li>
            complaints of reverse discrimination, such as "reverse racism",
            "reverse sexism" and "Cis-hostility".
          </li>
          <li>
            Complaints about set limits to communication, e.g. "leave me alone",
            "go away" or "I don't want to discuss this with you".
          </li>
          <li>
            Complaints about communication in a tone of voice that seems
            inappropriate to you.
          </li>
          <li>
            complaints about criticism of racism, sexism, cis-sexism or
            complaints about criticism of other, oppressive behaviour or views.
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" className={classes.bodyText}>
        Reporting infringements
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        If you are being harassed by a member or guest, notice that someone else
        is being harassed, or have any other concerns, please email the board at
        admin@invisible.project
        <br />
        The mail will then only be read by the administrator and treated
        confidentially. If the person harassing you is part of the board, that
        person will not participate in the processing of your case. We will
        reply as soon as we can, but no later than one week later.
        <br />
        This Code of Conduct applies to all areas of the IN_VISIBLE Space, but
        if you are harassed by a member of the IN_VISIBLE outside of our spaces,
        we will hear about it.
        <br />
        We will take seriously all honest reports of harassment by IN_VISIBLE
        members - especially harassment by members of the board. This includes
        harassment outside our premises and at any time.
        <br />
        The Board reserves the right to expel members based on past conduct,
        including conduct outside IN_VISIBLE and conduct towards persons outside
        IN_VISIBLE.
        <br />
        In order to protect volunteers from abuse and burnout, we reserve the
        right to reject any report that we believe to have been made with
        malicious intent. Reports that were created with the intention of
        suppressing justified criticism can be deleted without reply.
        <br />
        We respect the desire for confidentiality to protect victims of abuse.
        We will not publicly name victims of harassment without their consent.
      </Typography>
      <Typography variant="h5" className={classes.bodyText}>
        Consequences
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        Members and guests who are asked to refrain from harassing behaviour
        must comply with this request immediately.
        <br />
        If a member or guest harasses other members or guests, the board may
        respond with any action it deems appropriate. This includes exclusion
        from the association as well as a ban from all rooms and events.
      </Typography>
    </Paper>
  );
}
export default CodeOfConduct;
