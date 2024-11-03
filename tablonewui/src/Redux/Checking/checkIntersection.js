import toast from "react-hot-toast";
let hoursPrev = [];
let hoursNext = [];

export const checkIntersection = (program, state) => {
  let position;
  if (program.position)
    position = { ...program.position, count: program.count };
  else
    position = {
      day: program.day,
      hour: program.hour,
      classroom: program.classRoomId,
      count: program.count,
    };
  let programsToBeAddedInSameColumn = [];
  let programsInSameColumn = [];
  let programsToBeEditedInSameColumn = [];
  if (state.programsToBeAdded)
    programsToBeAddedInSameColumn = state.programsToBeAdded
      .filter(
        (e) =>
          e.position.day === position.day &&
          e.position.classroom === position.classroom,
      )
      .map((e) => ({ hour: e.position.hour, count: e.count }));
  if (state.courseProgram.data.coursePositions)
    programsInSameColumn = state.courseProgram.data.coursePositions
      .filter(
        (e) => e.day === position.day && e.classRoomId === position.classroom,
      )
      .map((e) => ({ hour: e.hour, count: e.count }));
  if (state.programsToBeEdited)
    programsToBeEditedInSameColumn = state.programsToBeEdited
      .filter(
        (e) =>
          e.next.position.day === position.day &&
          e.next.position.classroom === position.classroom,
      )
      .map((e) => ({ hour: e.next.position.hour, count: e.next.count }));

  const allProgramsInSameColumn = [
    ...programsToBeAddedInSameColumn,
    ...programsInSameColumn,
    ...programsToBeEditedInSameColumn,
  ];

  let hours = [position.hour];
  for (let i = 1; i < position.count; i++) {
    hours.push(hours[0] + i);
  }

  for (let i = 0; i < allProgramsInSameColumn.length; i++) {
    for (let j = 0; j < allProgramsInSameColumn[i].count; j++) {
      if (
        !hoursNext.includes(allProgramsInSameColumn[i].hour + j) &&
        hours.includes(allProgramsInSameColumn[i].hour + j)
      ) {
        return true;
      }
    }
  }
  return false;
};

export const checkEditIntersection = (program, state) => {
  for (let i = 0; i < program.next.count; i++) {
    hoursNext.push(i + program.next.position.hour);
  }
  const cond1 = checkIntersection(program.prev, state);
  hoursNext = [];
  const cond2 = !checkIntersection(program.next, state);
  return cond1 || cond2;
};
