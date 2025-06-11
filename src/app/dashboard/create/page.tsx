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

const CreateBlogRoute = () => {

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Share your thoughts</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label> Title </Label>
              <Input name="title" required type="text" placeholder="Enter title..."></Input>
            </div>
            <div className="flex flex-col gap-2">
              <Label> Content </Label>
              <Textarea name="content" required placeholder="Enter content..."></Textarea>
            </div>
            <div className="flex flex-col gap-2">
              <Label> Image URL </Label>
              <Input
                name="url"
                required
                type="url"
                placeholder="Enter image URL..."
              ></Input>
            </div>
            {/* <Button>Create Post</Button> */}
            <SubmitButton></SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlogRoute;
