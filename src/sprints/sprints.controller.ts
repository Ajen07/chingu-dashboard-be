import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Get, Delete,
} from "@nestjs/common";
import { SprintsService } from "./sprints.service";
import { UpdateTeamMeetingDto } from "./dto/update-team-meeting.dto";
import { CreateTeamMeetingDto } from "./dto/create-team-meeting.dto";
import {
    ApiBadRequestResponse, ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { CreateAgendaDto } from "./dto/create-agenda.dto";
import { UpdateAgendaDto } from "./dto/update-agenda.dto";
import { CreateMeetingFormResponseDto } from "./dto/create-meeting-form-response.dto";
import { FormInputValidationPipe } from "../pipes/form-input-validation";

@Controller("sprints")
@ApiTags("sprints")
export class SprintsController {
    constructor(private readonly sprintsService: SprintsService) {}

    // TODO: this route and most routes here will only be available to team member
    // To be added with authorization
    // TODO: add decorators for this route
    @Get("meetings/:meetingId")
    @ApiOperation({
        summary: 'gets meeting detail given meeting ID',
        description: 'returns meeting details such as title, meeting time, meeting link, notes, agenda, meeting forms. Everything needed to populate the meeting page.'
    })
    @ApiOkResponse({
        description: "Successfully get the meeting data"
    })
    @ApiNotFoundResponse({
        description: "Meeting with the supplied Id not found"
    })
    @ApiParam({
        name: "meetingId",
        required: true,
        description: "voyage team Meeting ID (TeamMeeting/id)",
    })
    getMeetingById(@Param("meetingId", ParseIntPipe) meetingId: number) {
        return this.sprintsService.getMeetingById(meetingId);
    }

    // TODO: there's an error when sprint id does not exist
    @Post(":sprintNumber/teams/:teamId/meetings")
    @ApiOperation({
        summary:
            "Creates a sprint meeting given a sprint number and team Id",
        description: "Returns meeting details"
    })
    @ApiCreatedResponse({
        status: 201,
        description: "The meeting has been created successfully.",
    })
    @ApiBadRequestResponse({
        status: 400,
        description: "Bad Request - Validation Error",
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "Resource not found.",
    })
    // temporary till we decided to let user create more than one meeting per sprint
    // currently there's a design issue where teams can only create 1 meeting per sprint.
    @ApiConflictResponse({
        status: 409,
        description: 'A meeting already exist for this sprint.'
    })
    @ApiParam({
        name: "sprintNumber",
        required: true,
        description: "sprint number of the voyage, e.g. 1, 2, 3, 4, 5, 6",
    })
    @ApiParam({
        name: "teamId",
        required: true,
        description: "voyage team ID",
    })
    createTeamMeeting(
        @Param("sprintNumber", ParseIntPipe) sprintNumber: number,
        @Param("teamId", ParseIntPipe) teamId: number,
        @Body() createTeamMeetingDto: CreateTeamMeetingDto,
    ) {
        return this.sprintsService.createTeamMeeting(
            teamId,
            sprintNumber,
            createTeamMeetingDto,
        );
    }

    @Patch("meetings/:meetingId")
    @ApiOperation({
        summary: 'Updates a meeting given a meeting ID',
        description: 'Updates meeting detail, including link, time, notes'
    })
    @ApiOkResponse({
        status: 200,
        description: "The meeting has been updated successfully.",
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "Invalid Meeting ID (MeetingId does not exist)",
    })
    editTeamMeeting(
        @Param("meetingId", ParseIntPipe) meetingId: number,
        @Body() updateTeamMeetingDto: UpdateTeamMeetingDto,
    ) {
        return this.sprintsService.updateTeamMeeting(
            meetingId,
            updateTeamMeetingDto,
        );
    }

    @Post("meetings/:meetingId/agendas")
    @ApiOperation({
        summary: 'Adds an agenda item given meeting ID',
        description: 'returns agenda item details.'
    })
    @ApiCreatedResponse({
        status: 201,
        description: "The agenda has been created successfully.",
    })
    @ApiBadRequestResponse({
        status: 400,
        description: "Bad Request - Invalid Meeting ID",
    })
    addMeetingAgenda(
        @Param("meetingId", ParseIntPipe) meetingId: number,
        @Body() createAgendaDto: CreateAgendaDto,
    ) {
        return this.sprintsService.createMeetingAgenda(
            meetingId,
            createAgendaDto,
        );
    }

    @Patch("agendas/:agendaId")
    @ApiOperation({
        summary: 'Updates an agenda item given an agenda ID',
        description: 'returns updated agenda item details.'
    })
    @ApiOkResponse({
        status: 200,
        description: "The agenda has been updated successfully.",
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "Invalid Agenda ID (AgendaId does not exist)",
    })
    updateMeetingAgenda(
        @Param("agendaId", ParseIntPipe) agendaId: number,
        @Body() updateAgendaDto: UpdateAgendaDto,
    ) {
        return this.sprintsService.updateMeetingAgenda(
            agendaId,
            updateAgendaDto,
        );
    }

    @Delete("agendas/:agendaId")
    @ApiOperation({
        summary: 'Deletes an agenda item given agenda ID',
        description: 'returns deleted agenda item detail.'
    })
    @ApiOkResponse({
        status: 200,
        description: "The agenda item has been successfully deleted"
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "Invalid Agenda ID (AgendaId does not exist)",
    })
    deleteMeetingAgenda(
        @Param("agendaId", ParseIntPipe) agendaId: number
    ) {
        return this.sprintsService.deleteMeetingAgenda(
            agendaId,
        );
    }

    @Post("meetings/:meetingId/forms/:formId")
    @ApiOperation({
        summary: 'Adds sprint reviews or sprint planning section to the meeting',
        description: 'This creats a record which stores all the responses for this particular forms' +
            'This should only work if the form type is "meeting"' +
            'sprint review - form name: "Retrospective & Review", <br> ' +
            'sprint planning - form name: "sprint Planning <br>' +
            'Note: form names are unique in the form table'
    })
    @ApiConflictResponse({
        status: 409,
        description: `FormId and MeetingId combination should be unique. There's already an existing form of the given formId for this meeting Id`
    })
    addMeetingFormResponse(
        @Param("meetingId", ParseIntPipe) meetingId: number,
        @Param("formId", ParseIntPipe) formId: number,
    ) {
        // TODO:
        //  1. add checks for 1 record per meeting - done
        //  2. check team and formId exist
        //  3. should not be able to link a non meeting form
        //  4. add more decorators
        //  5. custom 409 error

        return this.sprintsService.addMeetingFormResponse(
            meetingId,
            formId,
        );
    }

    @Get("meetings/:meetingId/forms/:formId")
    @ApiOperation({
        summary: 'Gets a form given meeting ID and formId',
        description: 'returns the form, including questions and responses'
    })
    getMeetingFormQuestionsWithResponses(
        @Param("meetingId", ParseIntPipe) meetingId: number,
        @Param("formId", ParseIntPipe) formId: number,
    ) {
        // TODO:
        //  1. check team and formId exist
        //  2. add more decorators
        return this.sprintsService.getMeetingFormQuestionsWithResponses(
            meetingId,
            formId,
        );
    }

    @Patch("meetings/:meetingId/forms/:formId")
    @ApiOperation({
        summary: 'Updates a form given meeting ID and formId',
        description: 'returns the updated form, including questions and responses'
    })
    updateMeetingFormResponse(
        @Param("meetingId", ParseIntPipe) meetingId: number,
        @Param("formId", ParseIntPipe) formId: number,
        @Body(new FormInputValidationPipe())
        createMeetingFormResponse: CreateMeetingFormResponseDto,
    ) {
        // TODO:
        //  1. check team and formId exist
        //  2. add more decorators
        //  3. custom 409 error

        return this.sprintsService.updateMeetingFormResponse(
            meetingId,
            formId,
            createMeetingFormResponse,
        );
    }
}
