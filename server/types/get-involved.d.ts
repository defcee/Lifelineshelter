export interface GetInvolvedForm {
  firstName: string;
  lastName: string;
  email: string;
  type: "Donate" | "Volunteer";
  message: string;
}
