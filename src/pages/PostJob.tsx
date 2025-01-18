import React from 'react';

const PostJob = () => {
  React.useEffect(() => {
    // Load Tally widget script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <iframe 
        data-tally-src="https://tally.so/r/waKJgZ"
        width="100%"
        height="100%"
        title="💼 CharteredJobs Employer Post a Job"
        className="border-0"
      />
    </div>
  );
};

export default PostJob;