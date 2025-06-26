import { handleSubmit } from "@/app/actions";
import SubmitButton from "@/components/general/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const BlogForm = ({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  submitLabel = "Create post",
}: {
  onSubmit: (formData: FormData) => Promise<void>;
  initialTitle?: string;
  initialContent?: string;
  submitLabel?: string;
}) => (
  <form action={onSubmit} className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <Label> Title </Label>
      <Input name="title" required type="text" placeholder="Enter title..." defaultValue={initialTitle}></Input>
    </div>
    <div className="flex flex-col gap-2">
      <Label> Content </Label>
      <Textarea name="content" required placeholder="Enter content..." defaultValue={initialContent}></Textarea>
    </div>
    <SubmitButton>{submitLabel}</SubmitButton>
  </form>
);

const CreateBlogRoute = () => {
  return (
    <div>
      <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
        Back to Dashboard
      </Link>
      <Card className="max-w-lg mx-auto mt-4">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Share your thoughts</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlogRoute;
export { BlogForm };
