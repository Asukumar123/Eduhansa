export default function Page() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground text-lg mb-6">Have questions or feedback? We love to hear from you.</p>
      <form className="space-y-4 max-w-lg">
        <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-md bg-background border-border" />
        <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-md bg-background border-border" />
        <textarea placeholder="Your Message" rows={4} className="w-full p-2 border rounded-md bg-background border-border"></textarea>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">Send Message</button>
      </form>
    </div>
  );
}
