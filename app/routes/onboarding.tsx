import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useFetcher, useActionData } from "@remix-run/react";

// const numberValidityChecker = async (number: string) => {
//   if (number.length === 10) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("THIS IS ACTION CALLED!!!!!");
  const formData = await request.formData();
  const number = formData.get("number");
  console.log(">>>>>> number >>>>", number);

  if (number && (number as string).length === 10) {
    return json({ number });
  }

  return null;
};

export const loader = async () => {
  const data = {
    fname: "Shrey",
    lname: "Dhyani",
    number: "1234567890",
    isNumberValid: "",
  };

  return json({ data });
};

export default function Onboarding() {
  const { data } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log(">>>>>>THIS IS ACTION DATA>>>>>", actionData);
  const onboarding = useFetcher();
  const onboarding_form = onboarding.Form;
  const isValid = onboarding.formData
    ? onboarding.formData.get("isNumberValid")
    : data.isNumberValid;

  console.log(">>>>>>> IS NUMBER VALID ", isValid);

  return (
    <onboarding.Form method="POST">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <label style={{ width: "200px" }}>
            <span>First Name:</span>
            <input
              defaultValue={data.fname}
              aria-label="First name"
              name="fname"
              type="text"
              placeholder="First Name"
            />
          </label>
          <label style={{ width: "200px" }}>
            <span>Last Name:</span>
            <input
              aria-label="Last name"
              defaultValue={data.lname}
              name="lname"
              placeholder="Last Name"
              type="text"
            />
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span>Mobile Number:</span>
          <input
            aria-label="Number"
            defaultValue={data.number}
            name="number"
            placeholder="Mobile Number"
            type="text"
            onChange={(e) => {
              if (e.target.value.length === 10) {
                console.log("Mobile number valid", onboarding_form);
                onboarding.submit(
                  { number: e.target.value },
                  {
                    navigate: false,
                  }
                );
              }
            }}
          />
        </label>
        <button type="submit">CHECK</button>
      </div>
    </onboarding.Form>
  );
}
