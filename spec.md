I want you to build a chrome extension that will help me test our SaaS product Great Question (I am a PM). specifically when role-playing as a participant in a research study for testing purposes, I want it to automatically fill in the form with the details I provide, and then optionally auto-submit the form for me.

when i land on one of these pages:
https://greatquestion.co/*/*/direct, or
https://greatquestion.co/*/*/bookings/new*
(and likely a few more)

I see a form like this:
Your details
Name: [text input]
Email: [text input]
[ ] I understand that my data is stored for research purposes for Integration test (prod) *
[ ] I understand that I can request for my research participation data to be deleted at any time *
[ ] I opt-in to being contacted for future studies

In html it looks like this: 

<form action="/integration-test-prod/xh60mf4q/bookings" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="-g_WwY4qkMuJjU3Qwj6kXnPL7QpVq_M6LUgOLJXR7WillzECIA-hv4ywOFU0hgOh1cWxhE1gssAseyER70FT8w" autocomplete="off">
  <h4 class="desktop:mt-0 my-6 mt-6">Your details</h4>
  <div class="mb-6">
    <label for="name" class="text-custom-brand block text-sm font-medium leading-5">Name</label>
    <input type="text" name="participation[name]" id="name" class=" mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full  tablet:text-sm border-gray-300 rounded-md ">
  </div>
    <div>
      <label for="email" class="text-custom-brand block text-sm font-medium leading-5">Email address</label>
      <input type="email" name="participation[email]" id="email" error="false" class=" mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full  tablet:text-sm border-gray-300 rounded-md ">
    </div>
  
  <input type="hidden" name="tz" id="tz" value="Australia/Sydney" autocomplete="off">
  <input type="hidden" name="participation[moderator_id]" id="participation_moderator_id" value="19941" autocomplete="off">
  <input type="hidden" name="event_id" id="event_id" autocomplete="off">
  <input type="hidden" name="start_time" id="start_time" value="1768442400" autocomplete="off">
  <input type="hidden" name="end_time" id="end_time" value="1768444200" autocomplete="off">

  <div class="flex flex-col mt-6 space-y-1">
      <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input type="hidden" name="participation[consent][data]" id="participation_consent_data" value="0" autocomplete="off">
      <input type="checkbox" name="participation[consent][data]" id="consent_data" value="1" required="required" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ">
  </div>
    <div class="ml-3 text-sm leading-5">
      <label class="font-normal text-custom-brand" for="consent_data">I understand that my data is stored for research purposes for Integration test (prod) *</label>
    </div>
  </div>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input type="hidden" name="participation[consent][can_opt_out]" id="participation_consent_can_opt_out" value="0" autocomplete="off">
      <input type="checkbox" name="participation[consent][can_opt_out]" id="consent_can_opt_out" value="1" required="required" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ">
  </div>
    <div class="ml-3 text-sm leading-5">
      <label class="font-normal text-custom-brand" for="consent_can_opt_out">I understand that I can request for my research participation data to be deleted at any time *</label>
    </div>
  </div>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input type="hidden" name="participation[consent][opt_in]" id="participation_consent_opt_in" value="0" autocomplete="off">
      <input type="checkbox" name="participation[consent][opt_in]" id="consent_opt_in" value="1" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ">
  </div>
    <div class="ml-3 text-sm leading-5">
      <label class="font-normal text-custom-brand" for="consent_opt_in">I opt-in to being contacted for future studies</label>
    </div>
  </div>

  </div>
  <div class="w-full mt-6">
    <span class=" inline-flex w-full rounded-md">
      <input type="submit" name="commit" value="Confirm &amp; book" data-disable-with="Submitting…" class="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold leading-5 border rounded-md btn-custom-brand cursor-pointer active:ring-2 active:ring-gray-700 active:border-gray-700 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none">
    </span>
  </div>
</form>


Every time I see this form, I want it to prefill it with:
Name: <name_prefix> <random string>
Email: <email_username>+<random string>@<email_domain>


where I specify <name_prefix> and the base email address (<email_username>@<email_domain>) in the extension settings.

it should also check the consent checkboxs, and if they are not checked, it should check them.

it should optionally also auto-submit the form for me based on a checkbox in the extension settings.


I'd ideally like to be able to specify a list of URLs (with wildcards) that should be checked for this form. Ideally I can set it pretty broad though (e.g. greatquestion.co/*)

it should also do some basic checking to make sure its filling in the right form (e.g. I wouldn't want it to go crazy and fill stuff in random forms that aren't like this one) -- tbd exactly how strict or loose this should be. I'm guessing it should be:
- needs a name input
- needs an email input
- needs the consent checkboxes to be present
let's start with that


I don't need this extension to be public but I want to be able to share it with my team (which includes non-technical folks) so it should be easy to install and use.