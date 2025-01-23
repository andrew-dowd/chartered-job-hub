interface JobDialogContentProps {
  reasoning?: string;
  responsibilities?: string;
  other_key_experience?: string;
  perks?: string;
}

export const JobDialogContent = ({
  reasoning,
  responsibilities,
  other_key_experience,
  perks,
}: JobDialogContentProps) => {
  return (
    <div className="space-y-4">
      {reasoning && (
        <div>
          <h3 className="font-semibold mb-2">High level experience</h3>
          <p className="text-gray-600 whitespace-pre-line">{reasoning}</p>
        </div>
      )}

      {responsibilities && (
        <div>
          <h3 className="font-semibold mb-2">Responsibilities:</h3>
          <p className="text-gray-600 whitespace-pre-line">{responsibilities}</p>
        </div>
      )}

      {other_key_experience && (
        <div>
          <h3 className="font-semibold mb-2">Other experience required</h3>
          <p className="text-gray-600 whitespace-pre-line">{other_key_experience}</p>
        </div>
      )}

      {perks && (
        <div>
          <h3 className="font-semibold mb-2">Perks & benefits</h3>
          <p className="text-gray-600 whitespace-pre-line">{perks}</p>
        </div>
      )}
    </div>
  );
};