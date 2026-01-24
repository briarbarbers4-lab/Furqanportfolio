import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const { mutate: sendMessage, isPending } = useSendMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertMessage) {
    // Construct email link with pre-filled content
    const subject = `New Message from ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
    const mailtoUrl = `mailto:furqan@luminexsocial.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    sendMessage(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <div className="w-full bg-[#1A1D26] p-8 rounded-2xl border border-white/5 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-white font-sans">Send a Message</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F7F8FC]/60">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    className="bg-[#0B0D12] border-white/10 text-white focus:border-[#0D21A1] focus:ring-1 focus:ring-[#0D21A1] transition-all" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F7F8FC]/60">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="hello@example.com" 
                    className="bg-[#0B0D12] border-white/10 text-white focus:border-[#0D21A1] focus:ring-1 focus:ring-[#0D21A1] transition-all" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F7F8FC]/60">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell me about your project..." 
                    className="min-h-[150px] bg-[#0B0D12] border-white/10 text-white focus:border-[#0D21A1] focus:ring-1 focus:ring-[#0D21A1] transition-all resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 bg-[#0D21A1] hover:bg-[#0D21A1]/90 text-white font-medium rounded-xl shadow-lg shadow-[#0D21A1]/25 hover:shadow-xl hover:shadow-[#0D21A1]/30 transition-all duration-300"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
